"""A small sample module so a new app passes its checks.

Replace it with the app's own code.
"""


def greet(name: str) -> str:
    """Return a greeting for name, or a general one when name is blank."""
    cleaned = name.strip()
    if not cleaned:
        return "Hello."
    return f"Hello, {cleaned}."
