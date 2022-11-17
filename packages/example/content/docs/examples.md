# Syntax highlighting

## Diff highlighting

### Example

````
```diff-python
estimator = model.fit(X_train, y_train,
                      validation_data = (X_test, y_test),
                      class_weight = calculate_class_weights(y_train),
-                     epochs = 10,
+                     epochs = MODEL_EPOCHS,
-                     batch_size = 120,
+                     batch_size = MODEL_BATCH_SIZE,
                      verbose = 1)
```
````

```diff-python
estimator = model.fit(X_train, y_train,
                      validation_data = (X_test, y_test),
                      class_weight = calculate_class_weights(y_train),
-                     epochs = 10,
+                     epochs = MODEL_EPOCHS,
-                     batch_size = 120,
+                     batch_size = MODEL_BATCH_SIZE,
                      verbose = 1)
```

## Alias command with arguments

Theme supports command line linkers with arguments based on alias.

For example:  
`dvc list --recursive --dvc-only` can be safely replaced by  
`dvc ls --recursive --dvc-only`

## Toggle tab sync

Example tab sync

First Toggle

<toggle>

<tab title="One">
First Tab One
</tab>

<tab title="Two">
First Tab Two
</tab>

<tab title="Three">
First Tab Three
</tab>

</toggle>

Second Toggle

<toggle>

<tab title="One">
Second Tab One
</tab>

<tab title="Two">
Second Tab Two
</tab>

<tab title="Three">
Second Tab Three
</tab>

</toggle>

## Skip code with hash

```cli
$ gto assign cv-class --version v0.1.13 --stage dev
Created git tag 'cv-class#dev#1' that assigns stage to version 'v0.1.13'
To push the changes upstream, run:
    git push origin cv-class#dev#1 #this is a comment
#This is a comment
```

## Highlight --options-with-hypthen

```cli
$ cml runner launch \
  --cloud=aws \
  --cloud-region=us-west \
  --cloud-type=m+t4 \
  --cloud-permission-set=arn:aws:iam::1234567890:instance-profile/dvc-s3-access \
  --labels=cml-gpu
```
