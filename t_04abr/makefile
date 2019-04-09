make: calc.fl calc.y
	flex calc.fl
	yacc calc.y
	cc -o calc y.tab.c -ly -lm

test: calc
	./calc <<< "3*9"
