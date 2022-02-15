# Arabic Dictation App
Arabic Dictation App is a tool for Arabic learners to practice the Arabic alphabet. The app is hosted at (https://arabic-dictation-app.herokuapp.com/)

## Major features
- Users can select the letters of the alphabet they know or want to practice.  
- The app will fetch a list of words that contain only those letters from the [back-end API](https://github.com/sarahstandish/arabic-dictation-app-backend), and present them to the user one by one.  The database contains more than 5000 Arabic words drawn from [A Frequency Dictionary of Arabic: Core Vocabulary for Learners](https://www.goodreads.com/book/show/4805313-a-frequency-dictionary-of-arabic).
- Audio files for each word were recorded using the Zeina voice of [AWS Polly](https://aws.amazon.com/polly/).
- Audio files are fetched from mp3s stored on [Google Cloud Storage](https://cloud.google.com/storage).
- Users hear the word pronounced and must type what they hear.
- The user can type the word using their device keyboard or an on-screen keyboard.  
- The app checks what the user entered against the correct spelling of the word and presents color-coded feedback to the user.

## Minor features
Minor features include:
- Keyboard control: 'Focus' on specific components so that desktop users can advance through a cycle of input - feedback - input using only keyboard input.  However, 'focus' on the input box is disabled when the user has the onscreen keyboard open in order to prevent a mobile device keyboard from popping up.
- Repetitive word fetching: The app fetches 10 words at a time from the API.  When the user has exhausted those ten words, another ten words are fetched.  
- Word recycling: When a user gets a word wrong, the word is added to the end of the list of words to be presented to the user.  The user will keep seeing that word repeated until they are able to enter it correctly.
- Error handling: Some letter combinations result in zero matching words or fewer than ten matching words.  An appropriate error is displayed if so and the user is asked to select another letter combination.
- Browser detection: While this may be considered more of a 'hack' than a feature, browser detection via the UserAgent string enables a smooth user experience.  On most browsers, users see feedback that is color-coded letter by letter to show the user what they got right and wrong.  On Safari and iOs browsers, color-coded feedback happens only at the letter of the word.  Due to a [Webkit bug](https://bugs.webkit.org/show_bug.cgi?id=6148), html elements cannot be interpolated with Arabic letters in a single word.

## Motivation for this project
This project was motivated by my years of teaching Arabic.  Learning Arabic the Arabic alphabet is a major barrier for students; when I was teaching, I noticed that the majority of students who dropped out of Arabic did so within the first six months of study and that students who had not mastered the alphabet were the most likely to drop out.  Meanwhile, students who were able to master the sound-shape pairings of the Arabic alphabet within this time frame were likely to continue their study at least for another year.  Dictation was an activity I frequently did in class with students, and it was extremely helpful in terms of their ability to recognize Arabic letter sounds and accurately pair these sounds with the relevant shapes.  However, it took me a long time to give crucial individual feedback to each student.  I wished for an app that would give quick and accurate feedback to students.

I completed this project as my final capstone project during my time at [Ada Developer's Academy](https://adadevelopersacademy.org/) in February 2022.

## Known Bugs
- Failure to repeat last incorrect word when fewer than 10 words available: When fetching a letter combination that results in fewer than 10 words, if the user gets the last word in the list wrong they will be sent directly to the error page and asked to search for a different letter combination, rather than getting the chance to repeat that
- Odd word pronunciation: While most of the audio recordings are quite good, some are not an accurate representation of the word.
- Frequently repeated words: The app fetchs 10 words at a time (the maximum that can be fetched via the API).  If a letter combination results a small number of combinations which is still greater than 10 (say, 11-20), the API will continue to cyclically fetch a random assortment of words but there will be a high likelihood of some of the same words being returned over and over.  This is less a true 'bug' than an expected behavior given the limitations of the tool, but it could be confusing and/or annoying to some users.

## Ideas for future development
- OCR input: My original dream for this project was to accept handwritten input on a touchscreen which would be evaluated via OCR.  At the time of this project, I was unable to find an OCR API, library, or model that was freely available and would produce reliable results with Arabic input.  For an educational product, it would be very important for this feature to be highly reliable in order to give accurate feedback to users.  While I do not foresee having the time available in the future to make majore changes or improvements to this project, if free Arabic OCR resources improve in the future, this would be a nice feature to add.
- Re-record audio: A more likely future development would be to re-record the existing audio repeatedly with newer and ever-more-accurate Arabic text-to-speech APIs.

## License
[CC-BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.en_GB)