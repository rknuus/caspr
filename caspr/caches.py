#!/usr/bin/env python
# -*- coding: utf-8 -*-

from caspr.googledotcom import FormulaConverter, publish_as_sheet


# TODO(KNR): is there some existing mechanism we can use instead?
class _Counter(object):
    ''' To count rows we need a stateful (i.e. non-primitive type) object. '''

    def __init__(self):
        ''' Initializes the counter to 1, because sheet cell addresses are 1-based. '''
        self._count = 1

    def increment(self):
        ''' Increment the count by 1 '''
        self._count += 1

    def get(self):
        ''' Returns the current count '''
        return self._count


class Caches:
    ''' The top-level logic to convert cache pages into sheets. '''

    def __init__(self, site, parser, factory):
        self._site = site
        self._parser = parser
        self._factory = factory

    def prepare(self, codes):
        ''' Fetches the page for each geocaching code, parses it, and generates a sheet. '''

        pages = (self._site.fetch(code=code) for code in codes)
        caches = (self._parser.parse(page=page) for page in pages)

        # TODO(KNR): how to call _publish() without explicitly iterating over names and stages?
        for cache in caches:
            Caches._publish(name=cache['name'], stages=cache['stages'], factory=self._factory)

    @staticmethod
    def _merge_tasks(stage, descriptions):
        ''' Merges all descriptions of tasks mentioned in multiple stages and yields each stage. '''

        # TODO(KNR): move to cache creation phase?
        for task in stage.tasks:
            for variable in task.variables:
                if variable not in descriptions:
                    descriptions[variable] = [task.description]
                else:  # merge the task description into the existing task description
                    descriptions[variable].append(task.description)
        return stage

    @staticmethod
    def _generate_formula(description, variable_addresses):
        converter = FormulaConverter(variable_addresses)
        for formula in converter.extract_formulae(description):
            dynamic_coordinates = '="{0}"&{1}'.format(converter.get_orientation(formula),
                                                      '&'.join(converter.split(formula)))
            yield dynamic_coordinates

    @staticmethod
    def _generate_rows_per_stage(stages, descriptions, variable_addresses, row_counter):
        ''' Generator providing the rows to be published to the Google Docs Sheet. '''

        # TODO(KNR): replace the dictionary based cache type by the same idiom
        for stage in stages:
            yield [stage.name, stage.coordinates]
            yield [stage.description]
            # TODO(KNR): consider to do the extraction of tasks from stage descriptions right here by merging in
            # the DescriptionParser
            for task in stage.tasks:
                # TODO(KNR): sort variables
                # TODO(KNR): if task.description is a formula: don't split task.variables, rather
                # yield [_generate_formula(description=task.description, variable_addresses=variable_addresses),
                #        task.variables]
                # else case:
                for variable in task.variables:
                    if variable not in variable_addresses:
                        variable_addresses[variable] = row_counter.get()
                        yield ['\n'.join(descriptions[variable]), variable]
            if variable_addresses:
                yield Caches._generate_formula(description=stage.description, variable_addresses=variable_addresses)

    @staticmethod
    def _generate_row_counters(rows, row_counter):
        for row in rows:
            row_counter.increment()
            yield row

    @staticmethod
    def _publish(name, stages, factory):
        ''' Generates a Google Docs Sheet with the passed name from the given stages. '''

        # cannot use generator expression for _merge_tasks because we need to iterate over all tasks before
        # preparing the rows
        descriptions = {}
        stages_with_unified_tasks = [Caches._merge_tasks(stage=stage, descriptions=descriptions) for stage in stages]
        variable_addresses = {}
        counter = _Counter()
        rows = Caches._generate_rows_per_stage(stages=stages_with_unified_tasks,
                                               descriptions=descriptions,
                                               variable_addresses=variable_addresses,
                                               row_counter=counter)
        rows = Caches._generate_row_counters(rows=rows, row_counter=counter)
        publish_as_sheet(name=name, rows=rows, factory=factory)
