import re


class CoordinateFilter:
    # TODO(KNR): is there a coordinate parser library?
    @staticmethod
    def filter(input):
        match = re.search('([NS]\s*\d{1,2}[°]?\s+\d{1,2}[.]\d{3}\s+[EW]\s*\d{1,3}[°]?\s+\d{1,2}[.]\d{3})', input)
        if not match:
            return None
        return match.group()
