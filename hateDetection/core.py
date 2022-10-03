from detoxify import Detoxify


def toxicity_of(message):
    return Detoxify('original').predict(message)["severe_toxicity"]