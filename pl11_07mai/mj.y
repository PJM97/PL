%code{
#define _GNU_SOURCE
#include <stdio.h>
int yyerror(char *s){fprintf(stderr,"Erro: %s\n",s);}
int yylex();
int tabEnd[26]; // tabela de endereços - mapea letra com posição tabEnd[0]='a'
int endereco(char*x){ return tabEnd[x[0]-'a']; }
int ultimo = -1; // ultimo endereço ocupado no tabEnd
void aloca(char* var){tabEnd[var[0]-'a']=++ultimo;}

#include "lex.yy.c"

}

%token NUM VAR PRINT INT ID READ STRING IF ELSE WHILE 

%union{
	double n;
    char*  c;
}

%type <n> NUM
%type <c> INT ID decls insts inst exp tipo parc fact STRING ifinst cond whileinst

%%

prog  : decls insts 		{printf("%s\nstart\n%s\nstop\n",$1,$2);}
	  ;

decls : decls VAR ID ':' tipo ';' {
							 asprintf(&$$,"%s\npushi 0\n",$1);
							 aloca($3);

}
	  |						{$$="";}
	  ;

insts : insts inst 			{asprintf(&$$,"%s\n%s",$1,$2);}
	  | 					{$$="";}
	  ;

inst  : ID '=' exp ';'		{asprintf(&$$,"%sstoreg %d\n",$3,endereco($1));}
	  | PRINT  exp ';'		{asprintf(&$$,"%swritei\npushs \"\\n\"\nwrites\n",$2);}
	  | READ STRING ',' ID ';' {asprintf(&$$,"pushs %s\nwrites\nread\natoi\nstoreg %d\n",$2,endereco($4));}  
	  | READ ID ';' 		{asprintf(&$$,"read\natoi\nstoreg %d\n",endereco($2));}
	  | ifinst 				{$$=$1;}
	  | whileinst 			{$$=$1;}
	  | '{' insts '}' 		{$$=$2;}
	  ;

whileinst : WHILE '(' cond ')' inst {asprintf(&$$,"while:\n%sjz fimwhile\n%sjump while\nfimwhile:\n",$3,$5);}

cond : exp {$$=$1;}
     ;

ifinst : IF '(' cond ')' inst {asprintf(&$$,"%sjz fimse\n%s\nfimse:\n",$3,$5);}
	   | IF '(' cond ')' inst ELSE inst {asprintf(&$$,"%sjz else\n%s\njump fimse\nelse:\n%sfimse:",$3,$5,$7);}

exp   : exp '+' parc		{asprintf(&$$,"%s\n%s\nadd\n",$1,$3);}
	  | exp '-' parc 		{asprintf(&$$,"%s\n%s\nsub\n",$1,$3);}
	  | parc				{$$=$1;}
	  ; 

parc  : parc '*' fact		{asprintf(&$$,"%s\n%s\nmul\n",$1,$3);}
	  | parc '/' fact 		{asprintf(&$$,"%s\n%s\ndiv\n",$1,$3);}
	  | fact				{$$=$1;}
	  ;

fact  : ID 					{asprintf(&$$,"pushg %d\n",endereco($1));}
	  | NUM					{asprintf(&$$,"pushi %.0f\n",$1);}
	  | '(' exp ')' 		{$$=$2;}
	  ;

tipo  : INT 				{$$="";}
	  ;

%%

int main(){
	yyparse();
	return 0;
}
