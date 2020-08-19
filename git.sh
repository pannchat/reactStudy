git add .
echo -e "commit message : c"
read
git commit -m "$REPLY"
git push origin master
echo "origin mast : $REPLY " 
