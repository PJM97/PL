make:
	flex notas.fl
	yacc -v notas.fl
	cc -o notas lex.yy.c



dump:
	od -c exemplo.txt