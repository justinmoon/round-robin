"""
skele

Usage:
  cli.py graph <user>
  cli.py graph -h | --help

Options:
  -h --help                         Show this screen.

"""
tokens = dict(
    justin=
    'EAAaMfBAARZA8BAGlvBzyDijouUvf0ZALMKQB44m3ORkMcfL38lE3ZBgc70MCligTuuORjsrfmLvhZAQJPAYw0FwkeZBjC3XZCFpkw7tTRl0xxTe6AKfo9NspyGIHvX6LDsnE56E5I1FKghGyG97y0qeqw6bXUJZAQzMZCfONFrcnn1465pdXArIIwnpaSiEWWJoX9vAxDwUl8MzxZAdOVZAyK13sRt0hvJhWIZD',
    two_friends=
    'EAAaMfBAARZA8BAJAz6uYXtKUmwMeglBENKNHtXmKHDZAIjv4n5UlNWYApKoa1hz63cZBu1o6UMWUClITW9wOgz8SNRpR1EbJFYGjet5EHEZC4yyrUM450nOTYIUbE2AjgX98j3lKKt1RcHEbqdiKxb2C52zH1cNqyAZAivwRRZBQzjO0pUycZCf',
)
from docopt import docopt
import requests


def test_fb_token(token):
    url = 'https://graph.facebook.com/me?fields=id,name,picture,friends&access_token={}'.format(
        token)
    res = requests.get(url)
    print(res.status_code)
    print(res.json())


if __name__ == '__main__':
    options = docopt(__doc__)

    if options.get('graph'):
        test_fb_token(tokens[options['<user>']])
