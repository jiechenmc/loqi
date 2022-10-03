from detoxify import Detoxify


def toxicity_of(message):
    return Detoxify('original').predict(message)["severe_toxicity"]


if __name__ == "__main__":
    Detoxify('original').predict("")