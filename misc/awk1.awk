BEGIN {FS="[ \t]*::[ \t]*"}

$3 ~ /euros/ 	{item[$1]=sprintf("%d",$2); print "["item[$1]"]",$1" :: "$2" :: "$3}
$3 ~!/euros/	{item[$1]+=sprintf("%d",($2 * item[$3])); print "["item[$1]"]",$1" :: "$2" :: "$3, "["item[$3]"]" }

NF==1 	{print "["$0"]" "==>" item[$1]}
