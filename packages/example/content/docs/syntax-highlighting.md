# Syntax highlighting

## Skip code with hash

```cli
$ gto assign cv-class --version v0.1.13 --stage dev
Created git tag 'cv-class#dev#1' that assigns stage to version 'v0.1.13'
To push the changes upstream, run:
    git push origin cv-class#dev#1 #this is a comment
#This is a comment
```

## Highlight --options-with-hyphen

```cli
$ cml runner launch \
  --cloud=aws \
  --cloud-region=us-west \
  --cloud-type=m+t4 \
  --cloud-permission-set=arn:aws:iam::1234567890:instance-profile/dvc-s3-access \
  --labels=cml-gpu
```
