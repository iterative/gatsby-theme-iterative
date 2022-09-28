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
