echo "Please enter the files to add";
typeset files="$(head -1)";
echo "Please enter a commit message:";
typeset msg="$( head -1 )";

# echo "Enter the branch to be deployed"
# typeset branch="$(head -1)"

date;
git add "$files";
git commit -m "$msg";
git push origin master;