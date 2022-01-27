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

# Unicode in Python
- Python's string type uses the Unicode standard for representing characters
- The *glyph* is the graphical representation of the character; Python doesn't need to worry about this.
- Default Python encoding is UTF-8
- Python supports using unicode characters in identifiers
- You can use escape sequences in string literals:
  - `print(f"\N{GREEK CAPITAL LETTER DELTA}")` # Δ using the character name
  - `print(f"\u0394")` # Δ using the 16-bit hex value
- One can create a string using the `bytes.decode(encoding="UTF-8", errors="strict")` which will return a string decoded from the given bytes.
  - The opposite is `str.encode('utf-8')` which returns a bytes representation of the Unicode string, encoded in the requested encoding
- `chr()` takes an integer and returns a unicode string of length 1 that contains the corresponding code point
- `ord()` takes a one-character unicode string and returns the unicode point value
- You can specify the encoding of the file with a commment such as the following at the top of the file:
  `#!/usr/bin/env python`
  `-*- coding: latin-1 -*-`
- The unicode data library includes some useful functions:
  `import unicodedata`
  - This allows you to use functions like:
    - `unicodedata.category(char)` # returns the characer category
    - `unicodedata.name(char)` # returns the character name
    - `unicodedata.numeric(char)` # returns the numeric code
    - `unicodedata.normalize(form, string)` # returns a normalized version of the string, where letters followed by a combining chracter are replaced by single characters (valid `form` arguments are `NFC`, `NFKC`, `NFD`, `NFKD`); this is useful in comparing strings, since they may not compare as equal when not normalized the same way, regardless of whether they look the same
- Create a case-insensitive version of the string: `string.casefold()`

# Arabic in Python
- Short vowels are included in the length of the string in Arabic

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


# Questions
- What is the best way to send multiple search parameters of variable and unknown number?  Right now I'm thinking I'll send all the letters as one string following the query parameter, e.g. `GET url/words?letters=ابتث`, then they would be broken apart on the back end and used to search.
- What are the query parameters I should expect, and how should I handle them on the back end?
- Where do I make the call to the voice-to-text API?  Probably I have to do it on the front end, because I'm not sure if I can send a file back as a response--but why not?
- What would be an invalid search?
- What tests do I need?
- If I need to have a file that's specifically to be pronounced by the API, do I need to store that in the database as well, or would I dynamically generate that, maybe in the model?

# API responses
  - Bad request (400):
    - Fewer than three letters were selected in the query string
    - Letters sent in the query string were not Arabic letters

# Sources and resources:
https://www.reedbeta.com/blog/programmers-intro-to-unicode/ (2017)
https://en.wikipedia.org/wiki/Arabic_script_in_Unicode
https://jkorpela.fi/unicode/guide.html
https://docs.python.org/3/library/unicodedata.html#module-unicodedata
https://docs.sqlalchemy.org/en/14/
https://www.postgresql.org/docs/9.3/functions-matching.html

# To read
https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/#3-unicode-in-javascript
https://stackoverflow.com/questions/59392535/flask-multiple-parameters-how-to-avoid-multiple-if-statements-when-querying-mult
https://stackoverflow.com/questions/17972020/how-to-execute-raw-sql-in-flask-sqlalchemy-app

# To Do
- Investigate & fix warning `deprecationWarning: '__ident_func__' is deprecated and will be removed in Werkzeug 2.1. It should not be used in Python 3.7+.` (generated by `pytest`)
- De dupe data set
- Deploy back end