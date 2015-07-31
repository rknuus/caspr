======
Design
======

Ideas
=====
- use a pipeline of iterator objects to gradually filter an process the input
- start with the most simple case, a simplified version of the Luzern Seepromenade multi, where the stages are defined in a table; ignore XY cases which mean (10*X+Y)
- there are three phases providing several steps to be combined in a reasonable manner:
  - file processing:
    - read content from STDIN
    - read content from a file
    - fetch the webpage of the geocache
    - identify stages in the description
    - identify stages in the stage table
    - merge stage data if required
  - stage processing
    - identify the variable naming scheme
    - identify formula scheme and normalize formula definitions (e.g. replace "[" and "]" by "(" and ")" )
    - search fixed coordinates (e.g. of stage 1)
    - search variable coordinates (e.g. if stage i+1 depends on variables of stages 1..i)
    - identify stage tasks and newly defined variables
    - identify conversions like SUM(A=1, B=2, ...), digit sums, etc.
  - sheet generation
    - create a Google Docs sheet named after the geocache
    - activate offline mode if possible
    - if required add conversion formulae like SUM(A=1, B=2, ...), digit sums, etc.
    - build table with stages, per stage:
      - write coordinates, if coordinates are variable enter a formula referring to the previously defined variables
      - write task descriptions
      - write newly defined variables
- it would be nice if each phase would provide a number of steps and the best step gets selected automatically

try this:
- per phase use a predefined number of steps
- for each step use a heuristic to rate the available algorithms for this step
- use izip() or itertools.chain() to combine multiple plausible algorithms and select the value of the highest ranked one returning a reasonable value
  - kind of like a blackboard per step
