git add .
echo "commit message : "
read
git commit -m "$REPLY"
git push origin master
echo "origin master : $REPLY " 
