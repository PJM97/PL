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

%token NUM VAR PRINT INT ID

%union{
	double n;
    char*  c;
}

%type <n> NUM
%type <c> INT ID decls insts inst exp tipo parc

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

inst  : ID '=' exp ';'		{asprintf(&$$,"%s\nstoreg %d\n",$3,endereco($1));}
	  | PRINT exp ';'		{asprintf(&$$,"%s\nwritei\npushs \"\\n\"\nwrites\n",$2);}
	  ;

exp   : exp '+' parc		{asprintf(&$$,"%s\n%s\nadd\n",$1,$3);}
	  | parc				{$$=$1;}
	  ;

parc  : ID 					{asprintf(&$$,"pushg %d\n",endereco($1));}
	  | NUM					{asprintf(&$$,"pushi %.0f\n",$1);}
	  ;

tipo  : INT 				{$$="";}
	  ;

%%

int main(){
	yyparse();
	return 0;
}
