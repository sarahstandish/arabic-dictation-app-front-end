# General notes
- *Character encoding* or *encoding* is the process of translating a unicode string into a sequence of bytes.
- *Code points* are the basic elements of unicode, kind of like characters
  - They are identified by number
  - They are usually written in hexadecimal with the prefix "U+", which represents their index in the code space
  - All listed in the unicode character database: http://www.unicode.org/reports/tr44/
  - The *codespace* is the set of all possible code points
    - Only about 12% has been assigned so far
  - The *basic multilingual plane* contains all the characters needed for modern text in any script, including Arabic
    - This was part of the original 16-bit encoding; Unicode was later expanded when that was insufficient
  - *endianness* is the pattern for byte-ordering.  *Big endian* means that the most significant byte comes first, and *little endian* means that the least significant byte comes first.
  - *Dynamically composing* characters means combining multiple code points together, such as combining diacritics with a letter of the alphabet (this prevents a "combinatorial explosion").  This is what enables certain symbols to be automatically stacked over or under a character.  This is used in *vowel pointing notation* in Arabic.
- *Canonically equivalent* strings are strings in which diacritics have been applied in different orders, but look visually the same.  This can happen when more than one diacritic is applied to the same letter, but the appearance is not changed (e.g. شدة and فتحة appearing on the same letter).  Canonically equivalent strings are supposed to be treated as identical for purposes of searching, sorting, rendering, etc.  This m eans that if you have a "find in file" operation in an app and a user searches for بَّ, the user should be able to find any combination of characters.
- *Normalization forms* are ways of converting strings into a canonical form so they can be compared code-point-to-code-point or byte-to-byte
  - *NDF normalization* decomposes every character down to its component base and combining marks, taking apart any precomposed code points in the string
  - *NFC normalization* puts items together into precomposed code points as much as possible
- *Grapheme clusters* are basically combinations of letters & diacritics which combine to what the user would perceive as a character, and is mainly used for editing because it points to a logical place to put a cursor.  They can also be useful for enforcing a string limit length in a database field.
- *Complex text layout* or *complex text rendering* is the typesetting of writing systems in which the shape or positioning of a grapheme depends on its relation to other graphemes.
- *Zero width joiner* is used to connect letters (if necessary) without a visible ligature.
- *zero width non-joiner* is used to separate letters that appear next to each other and which should not be joined.

# Encoding
- *UTF* or *Unicode Transformation Format* is a system to map Unicode code points into sequences of 'termed code values' (still not sure what that means)
- *UTF-8* is the most popular
  - Designed for backwards compatibilit with ASCII encoding.  
  - Takes a different amount of space for differe characters: one byte for English letters and symbols and two bytes for Latin and Middle Eastern characters; characters can take up to 4 bytes.
  - Two-byte code points range from U+0080 to U+07FF
  - Works well with string-programming conventions like delimiters, because ASCII bytes never occur inside the encoding of non-ASCII code points
  - However, it might cause some issues when iterating over 'characters' in a string--it will need to decode UTF-8 and iterate over code points, not bytes. 
  - When you measure the length of a string, you'll need to think about whether you want the length in bytes, code points, the width of the text when rendered, or something else.
  - Rules for UTF-8 encoding:
    - If the code point is < 128, it's represented by the corresponding byte value.
    - If the code point is >= 128, it's turned into a sequence of two, three, or four bytes, where each byte of the sequence is between 118 and 255
  - Zero bytes are used only to represent the null character U+0000, so they can be used by C functions and other protocols that can't handle zero bytes for anything other than end-of-string markers.  In UTF-16/32 encoding, there are zero bytes in a lot of characters that don't need the full width.
- *UTF-16* uses 16-bit characters.  
  - A descendant of the transition from the original Unicode code space where unicode was supposed to be all 16-bits
  - This is the standard string representation in JavaScript
  - Can be stored as either big-endian or little-endian
  - When using UTF-16, Unicode recommends putting a *byte-order mark* at the top of the page to signify which endianness is being used, however, this can cause problems when using UTF-8. For UTF-16, `U+FEFF` may be placed as the first character of a file or character stream for this purpose.
- *UTF-32* 32-bit integer encoding
  - Encodes all characters using 4 bytes, which adds up to a lot of additional memory and ultimately performance concerns.
  - This is rarely used for storage; it might be used as a temporary internal representation for examining or operating on the code points in a string.

# Arabic Script in Unicode
- Arabic script is contained in the following blocks:
  - Arabic (0600–06FF, 256 characters) (https://en.wikipedia.org/wiki/Arabic_(Unicode_block))
  - Arabic Presentation Forms-B (FE70–FEFF, 141 characters) (https://en.wikipedia.org/wiki/Arabic_Presentation_Forms-B)
    - These are present only for compatibility with older standards and are not currently needed for coding text.
  - Arabic Mathematical Alphabetic Symbols (1EE00–1EEFF, 143 characters)
  - There are other blocks which contain letters that are not used in Arabic, but in other alphabets which are based on the Arabic script

# SQL queries re substrings
- `SUBSTRING(expression, starting_position, length)` where `expression` seems to be the string you are searching, `starting_position` is from where we could extract the substring (first character value is 1), and `length` is how many characters we want to retrieve, beginning from the starting position...I'm not sure if this is useful to me, but perhaps if there is a substring to retrieve, it would allow me to check if the character is there.
- `CHARINDEX(substring, input_string)` this feels more promising...`substring` is the position in the specified string, `input_string` is the string to search. The result will be zero if the substring is not found in the input string.
- `PATINDEX('%pattern%', input_string)` looks for the first occurence of a pattern in the input string and returns the starting position of it, where `%pattern%` is the character expression we want to look for and `input_string` is the string we want to search.  It looks like this can accept regex
- Sample SQL query that might be a decent model:
  `SELECT * FROM MyTable`
  `WHERE CHARINDEX('a', Column1) > 0`
    `AND CHARINDEX('b', Column1) > 0`
    `AND CHARINDEX('c', Column1) > 0`
- `LIKE` operator is the most commonly used operator for pattern matching in SQL:
  `SELECT * FROM table WHERE field LIKE '%a%';`

# JavaScript and Unicode
- JavaScript UTF-16 encoding internally, however, a JS sourcefile can have any kind of encoding and JS will convert it internally to UTF-16 before executingn it
- Take care when accessing strings by index or counting characters in case some characters need more than one code unit to be represented.
- Always think of strings in JS as a sequence of code units, rather than thinking of it the way the string on the screen is rendered.
- Most Javascript string methods are not unicode-aware.  If your string contains compound unicode characters, take precautions when using myString.slice(), myString.substring(), etc
- JavaScript has three types of escape sequences which can be used to express Unicode
  - `\u<hex>` is the hexadecimal escape sequence (same as Python). This can only escape 4-digit code points, but this does cover everything in the BMP so I should be fine to use it for Arabic.
  - `\u{<hex>}` can take any hex codes from all of unicode, so there is no need to use surrogate pairs when coding astral symbols (symbols not from the BMP); this code will take care of it for you by creating another surrogate pair 'under the hood'
  - `/\u{<hex>}/u` is a regular expression that enables additional unicode features
  - when using an regular expression, use two \\ to escape the one \: `\\u<hex>` or `\\u{<hex>}`
- Watch out for string comparisons where the strings look visually the same but the code points are not the same; normalization handles this (but I'm not sure it has been relevant in Arabic so far).
  - `myString.normalize('form')` normalizes a string in accordance with the form chosen: NFC, NFD, NFKC, or NFKD; default is NFC if not passed a parameter.  When comparing, it may make more sense to 
- Some potentially useful methods:
  - `stringName.codePointAt(index)` // get the code point of a character, unicode aware -- will get the full code point even if dealing with surrogate pairs
  - `numberVar.toString(16)` // convert to string in hex
  - `String.fromCodePoint(number)` // convert a code point to a character
  - `stringName.charCodeAt(index)` // get the code point of the character
  - Accessing string items by index / slicing is not necessarily unicode-aware, so there could be problems with accessing characters and their diacritics separately. The methods indexOf() and slice() are also not unicode-aware. (Since Arabic has no astral plane characters I don't think this will be a problem.)
- "Only operations that are explicitly specified to be language or locale sensitive produce language-sensitive results." https://262.ecma-international.org/6.0/#sec-ecmascript-language-types-string-type I'm not sure what this means! :/
- Specify the encoding with one of three options, not sure what the difference is:
  - `Content-Type: application/javascript; charset=utf-8`
  - `<script src="./app.js" charset="utf-8">`
  - `<meta charset="utf-8" />`
- For strings, iterability is based on code points

# Questions
- If the default JS encoding is UTF-16, will that cause problems when translating to Python?  Or since my data is only speaking via the API, will it matter?  How could UTF-16 code points be transmitted via URL when there is no chance to transmit a byte-order mark?

# Sources and resources:
https://www.reedbeta.com/blog/programmers-intro-to-unicode/ (2017)
https://en.wikipedia.org/wiki/Arabic_script_in_Unicode
https://jkorpela.fi/unicode/guide.html
https://docs.python.org/3/library/unicodedata.html#module-unicodedata
https://docs.sqlalchemy.org/en/14/
https://www.postgresql.org/docs/9.3/functions-matching.html
https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/#3-unicode-in-javascript
https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
https://blog.maisie.ink/react-ref-autofocus/
https://github.com/mars/create-react-app-buildpack#user-content-requires
https://stackoverflow.com/questions/7069247/inserting-html-tag-in-the-middle-of-arabic-word-breaks-word-connection-cursive

# To read

# To Do - functionality
- Add 'about' footer
- Add slower button or record all words more slowly
- Low priority bug fix: If 'words' is empty and 'morewordsavailable' is false and the user gets the current word wrong, the user will be instructed to search for more words without retrying that word
- Remove word with id 401 مباراة very bad pronunciation!!
- Delete word 4439 لِـ
- Check AllLettersButton onClick prop
- Redo recordings with Amazon Polly https://docs.aws.amazon.com/polly/latest/dg/get-started-what-next.html
- Test out words: https://ttsmp3.com/faq

# To Do - styles
- Check mobile visibility
- Check appearance across browsers
- Make sure there is a 
- Enlarge 'all letters' button
- Check spacing of elements
- Fix variable spacing of elements

# Arabic font notes
  /* --arabic-font: 'Scheherazade New', serif; Classic font, very graceful */
  /* --arabic-font: 'IBM Plex Sans Arabic', sans-serif; Evaluation: best one so far */
  /* --arabic-font: 'Readex Pro', sans-serif; Evaluation: something is weird or unclear about it */
  /* --arabic-font: 'Almarai', sans-serif; Evaluation: It's fine. Very square. */
  /* --arabic-font: 'Baloo Bhaijaan 2', cursive; Evaluation: It's fine, nothing exciting, an okay option */
  /* --arabic-font: 'Harmattan', sans-serif; Evaluation: A little cartoony for me*/
  /* --arabic-font: 'Noto Naskh Arabic', serif; Evaluation: amazing font but لا looks weird :(*/ 