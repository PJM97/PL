run: x.dot
	dot -Tpdf x.dot > x.pdf
	xpdf x.pdf

primos:
	primes 1 100 | gnuplot -p -e 'plot "dev/stdin"'