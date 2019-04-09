run: x.dot
	dot -Tpdf x.dot > x.pdf
	xpdf x.pdf

# primos:
# 	primes 1 100 | gnuplot -p -e 'plot "dev/stdin"'

make: calc.fl calc.y
	flex calc.fl
	yacc calc.y
	cc -o calc y.tab.c -ly -lm

test: calc
	./calc <<< "3*9"
