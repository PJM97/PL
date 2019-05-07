make: mj.fl
	flex mj.fl
	yacc -v mj.y
	cc -o mj y.tab.c

vm: p.vm
	vms p.vm

vmg: p.vm
	vms -g p.vm &

run: mj exemplo.mj
	./mj < exemplo.mj > resultado.vm
	vms resultado.vm

clean: 
	rm lex.yy.c
	rm y.tab.c
	rm y.output