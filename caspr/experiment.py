# based on:
# - http://lxml.de/parsing.html#parsing-html
# - http://www.techchorus.net/web-scraping-lxml
#
# do not use root.find(), because this uses a limited XPath library
#
# combine with requests to fetch data from the web, e.g. as in http://docs.python-guide.org/en/latest/scenarios/scrape/


from itertools import chain
from lxml import etree
from lxml.etree import tostring


def stringify_children(node):
    import pdb; pdb.set_trace()
    parts = ([node.text] + list(chain(*([c.text, tostring(c), c.tail] for c in node.getchildren()))) + [node.tail])
    # remove possible Nones in texts and tails
    return ''.join(filter(None, parts))


node = etree.fromstring("""<content>Text outside tag <div>Text <em>inside</em> tag</div></content>""")
# print(stringify_children(node))
"".join(x for x in node.itertext())

parser = etree.HTMLParser()
root = etree.parse("tests/sample_data/GC2A62B Seepromenade Luzern [DE_EN] (Multi-cache) in Zentralschweiz (ZG_SZ_LU_UR_OW_NW), Switzerland created by Worlddiver.html", parser)
# stages = root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr")
names = root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=6]")
for i, name in enumerate(names):
    # print("name ", str(i+1), ": ", stringify_children(name))
    print("name ", str(i+1), ": ", "".join(x for x in name.itertext()))


# how to chain generators:
#
# from itertools import chain

# def generator1():
#     for item in 'abcdef':
#         yield item

# def generator2():
#     for item in '123456':
#         yield item

# generator3 = chain(generator1(), generator2())
# for item in generator3:
#     print item


# about fast XML processing as described in http://stackoverflow.com/questions/4695826/efficient-way-to-iterate-throught-xml-elements:
# also see http://www.ibm.com/developerworks/xml/library/x-hiperfparse/
# def fast_iter(context, func, *args, **kwargs):
#     """
#     fast_iter is useful if you need to free memory while iterating through a
#     very large XML file.

#     http://lxml.de/parsing.html#modifying-the-tree
#     Based on Liza Daly's fast_iter
#     http://www.ibm.com/developerworks/xml/library/x-hiperfparse/
#     See also http://effbot.org/zone/element-iterparse.htm
#     """
#     for event, elem in context:
#         func(elem, *args, **kwargs)
#         # It's safe to call clear() here because no descendants will be
#         # accessed
#         elem.clear()
#         # Also eliminate now-empty references from the root node to elem
#         for ancestor in elem.xpath('ancestor-or-self::*'):
#             while ancestor.getprevious() is not None:
#                 del ancestor.getparent()[0]
#     del context

# def process_element(elt):
#     print(elt.text)

# context=etree.iterparse(io.BytesIO(xml), events=('end',), tag='b')
# fast_iter(context, process_element)
