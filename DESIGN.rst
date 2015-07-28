======
Design
======

Ideas
=====
- use a pipeline of iterator objects to gradually filter an process the input
- start with the most simple case, a simplified version of the Luzern Seepromenade multi, where the stages are defined in a table; ignore XY cases which mean (10*X+Y)
- the algorithm roughly is:
  - read in the configured google docs user name (and password)
  - fetch the page of a given cache ID/name/URL
  - extract the stage table from the page
  - identify stages
  - try to guess the variable naming scheme (e.g. A, B, C, ...)
  - set up an object similar to the variable lookup table in compilers (what was the name again?)
  - for each stage:
    - identify fixed positions (e.g. for the start stage, or for fixed stages)
    - identify the variable(s)
    - identify the task description per variable
    - identify dependencies on other stages through variables for dependent positions
  - generate a google docs sheet page and print the URL
