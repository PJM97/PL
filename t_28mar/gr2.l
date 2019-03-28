%option noyywrap

%%

[\[\],\n] {return yytext[0];}

\	{}