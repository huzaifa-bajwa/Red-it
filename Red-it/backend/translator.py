from translate import Translator
import translate

''''
Available languages
{'af': 'afrikaans', 'sq': 'albanian', 'am': 'amharic', 'ar': 'arabic', 'hy': 'armenian', 'az': 'azerbaijani', 'eu': 'basque', 
    'be': 'belarusian', 'bn': 'bengali', 'bs': 'bosnian', 'bg': 'bulgarian', 'ca': 'catalan', 'ceb': 'cebuano', 
    'ny': 'chichewa', 'zh-cn': 'chinese (simplified)', 'zh-tw': 'chinese (traditional)', 'co': 'corsican', 'hr': 'croatian', 
    'cs': 'czech', 'da': 'danish', 'nl': 'dutch', 'en': 'english', 'eo': 'esperanto', 'et': 'estonian', 'tl': 'filipino', 
    'fi': 'finnish', 'fr': 'french', 'fy': 'frisian', 'gl': 'galician', 'ka': 'georgian', 'de': 'german', 'el':, 'he': 'hebrew', 
    'hi': 'hindi', 'hmn': 'hmong', 'hu': 'hungarian', 'is': 'icelandic', 'ig': 'igbo', 'id': 'indonesian', 'ga': 'irish', 
    'it': 'italian', 'ja': 'japanese', 'jw': 'javanese', 'kn': 'kannada', 'kk': 'kazakh', 'km': 'khmer', 'ko': 'korean', 
    'ku': 'kurdish (kurmanji)', 'ky': 'kyrgyz', 'lo': 'lao', 'la': 'latin', 'lv': 'latvian', 'lt': 'lithuanian', 
    'lb': 'luxembourgish', 'mk': 'macedonian', 'mg': 'malagasy', 'ms': 'malay', 'ml': 'malayalam', 'mt': 'maltese', 'mi': 'maori',
    'mr': 'marathi', 'mn': 'mongolian', 'my': 'myanmar (burmese)', 'ne': 'nepali', 'no': 'norwegian', 'or': 'odia', 'ps': 'pashto',
    'fa': 'persian', 'pl': 'polish', 'pt': 'portuguese', 'pa': 'punjabi', 'ro': 'romanian', 'ru': 'russian', 'sm': 'samoan', 
    'gd': 'scots gaelic', 'sr': 'serbian', 'st': 'sesotho', 'sn': 'shona', 'sd': 'sindhi', 'si': 'sinhala', 'sk': 'slovak', 
    'sl': 'slovenian', 'so': 'somali', 'es': 'spanish', 'su': 'sundanese', 'sw': 'swahili', 'sv': 'swedish', 'tg': 'tajik', 
    'ta': 'tamil', 'te': 'telugu', 'th': 'thai', 'tr': 'turkish', 'uk': 'ukrainian', 'ur': 'urdu', 'ug': 'uyghur', 'uz': 'uzbek', 
    'vi': 'vietnamese', 'cy': 'welsh', 'xh': 'xhosa', 'yi': 'yiddish', 'yo': 'yoruba', 'zu': 'zulu'}
'''

def key_for_a_specific_Language(language):
    if language == 'urdu':
        return 'ur'
    elif language == 'arabic':
        return 'ar'
    elif language == 'chinese':
        return 'zh-cn'
    elif language == 'french':
        return 'fr'
    elif language == 'german':
        return 'de'
    elif language == 'hindi':
        return 'hi'
    elif language == 'italian':
        return 'it'
    elif language == 'japanese':
        return 'ja'
    elif language == 'korean':
        return 'ko'
    elif language == 'russian':
        return 'ru'
    elif language == 'spanish':
        return 'es'

def translate_text_to_target_language(text: str, target_language: str):  #Translating the text to the target language
    if target_language == 'english':
        return text
    target_language = key_for_a_specific_Language(target_language)
    translator = Translator(to_lang=target_language)
    if len(text) > 500: #500 CHARS is max limit
        translated_text = ""
        while len(text) > 500:         #Translating 500 characters at a time
            last_space = text.rfind(' ', 0, 500)
            first_part = text[:last_space]
            translation = translator.translate(first_part)
            translated_text += translation
            text = text[last_space:]
        translation = translator.translate(text)
        translated_text += translation
        return translated_text
    else:
        translation = translator.translate(text)
        return translation

