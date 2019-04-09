%code{
#include <stdio.h>
#include <math.h>
#include "lex.yy.c"
int yyerror(char *s){fprintf(stderr,"Erro: %s\n",s);}
int fat(int);
int yylex();
}
%token NUM R2R
%union{ double n;
		double (*f)(double);
}
%type <n> e p f NUM
%type <f> R2R
%%

ax : ax e '\n' { printf("%f\n",$2); }
   | ax '\n'
   |
   ;

e : e '+' p { $$ = $1 + $3; }	// expressão
  | e '-' p { $$ = $1 - $3; }
  | p 		{ $$ = $1; }
  ;

p : p '*' f { $$ = $1 * $3; }	// parcela (dentro da expressão)
  | p '/' f { $$ = $1 / $3; }
  | f 		{ $$ = $1; }
  ;

f : NUM 			{ $$ = $1; } 		// fator (dentro da parcela)
  | f '!'			{ $$ = fat($1); }
  | '(' e ')'		{ $$ = $2; }
  | R2R '(' e ')'	{ $$ = ($1)($3);}
  ;

%%
int fat(int x){return x>=2?x*fat(x-1):1;}
int main(){
	yyparse();
	return 0;
}