import re


class StaticCoordinate:
    # TODO(KNR): is there a coordinate parser library?

    _LONGITUDE_PATTERN = '[NS]\s*\d{1,2}[°]?\s+\d{1,2}[.]\d{3}'
    _LATTITUDE_PATTERN = '[EW]\s*\d{1,3}[°]?\s+\d{1,2}[.]\d{3}'
    _PARTIAL_RE = re.compile('({longitude}|{lattitude})'.format(longitude=_LONGITUDE_PATTERN,
                                                                lattitude=_LATTITUDE_PATTERN))
    _COORDINATE_RE = re.compile('({longitude}\s+{lattitude})'.format(longitude=_LONGITUDE_PATTERN,
                                                                     lattitude=_LATTITUDE_PATTERN))

    @staticmethod
    def match(input):
        match = re.search(StaticCoordinate._COORDINATE_RE, input)
        if not match:
            return None
        return match.group()

    @staticmethod
    def match_partially(input):
        match = re.search(StaticCoordinate._PARTIAL_RE, input)
        if not match:
            return None
        return match.group()

    @staticmethod
    def filter(input):
        return re.sub(StaticCoordinate._PARTIAL_RE, '', input)
