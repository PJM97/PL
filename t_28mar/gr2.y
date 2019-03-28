%code {
	#define _GNU_SOURCE
	#include<stdio.h>
	void yyerror(){fprintf(stderr,"Erro\n");}
}
%union {char *s;}
%token ID;
%type <s> M ID E L
%%
L : '[' M ']' '\n' {printf("%d\n",$2 );}
  ;

M : E 			{ $$ = $1; }
  | E ',' M 	{asprintf(&$$,"%s\n%s",$1,$3)}
  ;

E : L 			{asprintf(&$$,"\\BEI\n %s \n\\ENDI",$1);}
  | ID 			{asprintf(&$$,"\\item ",$1);}
  ;

%%
#include "lex.yy.c"