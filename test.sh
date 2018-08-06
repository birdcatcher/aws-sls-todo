url=$(./url.sh | tr "\n" "&" | sed 's/?&/?/' | sed 's/&$//')
open $url