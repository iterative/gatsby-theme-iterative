# metrics

A set of commands to display and compare _metrics_:
[show](/doc/command-reference/metrics/show), and
[diff](/doc/command-reference/metrics/diff).

## Synopsis

```usage
usage: dvc metrics [-h] [-q | -v] {show,diff} ...

positional arguments:
  COMMAND
    show                Print metrics, with optional formatting
    diff                Show changes in metrics between commits.
```

## Types of metrics

DVC has two concepts for metrics, that represent different results of machine
learning training or data processing:

1. `dvc metrics` represent **scalar numbers** such as AUC, _true positive rate_,
   etc.
2. `dvc plots` can be used to visualize **data series** such as AUC curves, loss
   functions, confusion matrices, etc.

## Description

In order to follow the performance of machine learning experiments, DVC has the
ability to mark a certain stage <abbr>outputs</abbr> as metrics. These metrics
are project-specific floating-point or integer values e.g. AUC, ROC, false
positives, etc.

This type of metrics files are typically generated by user data processing code,
and are tracked using the `-m` (`--metrics`) and `-M` (`--metrics-no-cache`)
options of `dvc stage add`.

In contrast to `dvc plots`, these metrics should be stored in hierarchical
files. Unlike its `dvc plots` counterpart, `dvc metrics diff` can report the
numeric difference between the metrics in different experiments, for example an
`AUC` metrics that is `0.801807` and gets increase by `+0.037826`:

```dvc
$ dvc metrics diff
Path          Metric    HEAD      workspace  Change
metrics.json  AUC       0.763981  0.801807   0.037826
```

`dvc metrics` subcommands can be used on any
[valid metrics files](#supported-file-formats). By default they use the ones
specified in `dvc.yaml` (if any), for example `summary.json` below:

```yaml
stages:
  train:
    cmd: python train.py
    deps:
      - users.csv
    outs:
      - model.pkl
    metrics:
      - summary.json:
          cache: false
```

> `cache: false` above specifies that `summary.json` is not tracked or
> <abbr>cached</abbr> by DVC (`-M` option of `dvc stage add`). These metrics
> files are normally committed with Git instead. See `dvc.yaml` for more
> information on the file format above.

### Supported file formats

Metrics can be organized as tree hierarchies in JSON or YAML 1.2 files. DVC
addresses specific metrics by the tree path. In the JSON example below, five
metrics are presented: `train.accuracy`, `train.loss`, `train.TN`, `train.FP`
and `time_real`.

```json
{
  "train": {
    "accuracy": 0.9886999726295471,
    "loss": 0.041855331510305405,
    "TN": 473,
    "FP": 845
  },
  "time_real": 344.61309599876404
}
```

DVC itself does not ascribe any specific meaning for these numbers. Usually they
are produced by the model training or model evaluation code and serve as a way
to compare and pick the best performing experiment.

## Options

- `-h`, `--help` - prints the usage/help message, and exit.

- `-q`, `--quiet` - do not write anything to standard output. Exit with 0 if no
  problems arise, otherwise 1.

- `-v`, `--verbose` - displays detailed tracing information.

## Examples

First, let's imagine we have a simple [stage](/doc/command-reference/run) that
produces an `eval.json` metrics file:

```dvc
$ dvc stage add -n evaluate -d code/evaluate.py -M eval.json \
                python code/evaluate.py

$ dvc repro
```

> `-M` (`--metrics-no-cache`) tells DVC to mark `eval.json` as a metrics file,
> without tracking it directly (You can track it with Git). See `dvc stage add`
> for more info.

Now let's print metrics values that we are tracking in this
<abbr>project</abbr>, using `dvc metrics show`:

```dvc
$ dvc metrics show
        eval.json:
                AUC: 0.66729
                error: 0.16982
                TP: 516
```

When there are metrics file changes (before committing them with Git), the
`dvc metrics diff` command shows the difference between metrics values:

```dvc
$ dvc metrics diff

Path       Metric    HEAD     workspace  Change
eval.json  ACU       0.65115  0.66729    0.01614
eval.json  error     0.1666   0.16982    0.00322
eval.json  TP        528      516        -12
```