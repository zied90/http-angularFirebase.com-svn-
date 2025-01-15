PS C:\dev\Front\Ellipse> git pull
error: cannot lock ref 'refs/remotes/origin/feature/DEMAT-15138': Unable to create 'C:/dev/Front/Ellipse/.git/refs/remotes/origin/feature/DEMAT-15138.lock': File exists.

Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again. If it still fails, a git process
may have crashed in this repository earlier:
remove the file manually to continue.
From https://dev.azure.com/axafrance/PFEL/_git/Ellipse
 ! f0ca680..c1acfde  feature/DEMAT-15138 -> origin/feature/DEMAT-15138  (unable to update local ref)
PS C:\dev\Front\Ellipse> 
