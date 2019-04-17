%code{
#include <stdio.h>
#include "lex.yy.c"
int yyerror(char *s){fprintf(stderr,"Erro: %s\n",s);}
int yylex();
}
%token NUM TXT
%union{ double n;
        char*  c;
      }
%type <n> notas NUM 
%type <c> TXT
%%

ax     : uni
       |
       ;

uni    : uni curso    //terminais sao maiusculos (&viceversa)
       |
       ;


curso  : CURSO ':' TXT NUM alunos
       ;

alunos : alunos TXT '(' NOTAS ')' {
          printf("%s: %.1f",$2,($4/cont),cont);
        }
       |   
       ;

notas  : NUM ',' notas {$$ = $1+$3; cont++;}
       | NUM           {$$ = $1;    cont=1;}
       ;

[]

%%
int fat(int x){return x>=2?x*fat(x-1):1;}
int main(){
  printf("\\begin{tabular}{|l|r|r|}\n\\hline\n");
	printf("Nome&Média&Número de Disciplinas\\\\\n");
  yyparse();
  printf("\\hline\n\\end{tabular}\n");
	return 0;
}