make: mj.fl
	flex mj.fl
	yacc -v mj.y
	cc -o mj y.tab.c

vm: p.vm
	vms p.vm

vmg: p.vm
	vms -g p.vm &

run: exemplo.mj
	./mj < exemplo.mj > soma.vm
	vms soma.vm