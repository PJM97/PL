make: p.fl
	flex p.fl
	cc -o p lex.yy.c

run: p exemplo.txt
	make
	./p < exemplo.txt

p2: p2.fl exemplo2.txt
	flex p2.fl
	cc -o p2 lex.yy.c
	./p2 < exemplo2.txt

awk1: awk1.awk exemplo_awk1.txt
	clear
	awk -f awk1.awk exemplo_awk1.txt