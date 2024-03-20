def is_valid_name(name):
    # Remove leading and trailing spaces
    trimmed_name = name.strip()
    
    # Check if the name is not empty and contains only alphabetic characters (and spaces, if you allow spaces within names)
    if trimmed_name and all(char.isalpha() or char.isspace() for char in trimmed_name):
        return True
    else:
        return False