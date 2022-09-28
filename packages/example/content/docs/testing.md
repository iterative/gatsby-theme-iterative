# Testing syntax highlighting

## Diff

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
