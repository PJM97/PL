make:
	flex mj.fl
	yacc -v mj.y
	cc -o mj y.tab.c

vm:
	vms p.vm

vmg:
	vms -g p.vm

run:
	./mj < exemplo.mj > soma.vm
	vms soma.vm