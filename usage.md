#tl;dr;

SQiggL (currently) supports the actions `if else endif` and the condition/modifier pairs `is null, is not null, >, <, >=, <=, =, ==, ===, !>, !>=, !<, !<=, !=, !==` and other more uncommon ones. _(See the modifier section below for a full list)_

Example:
```
    UPDATE Something SET 
        {{% if myVar is not null %}} 
            FirstName = '{{ myVar }}' 
        {{% else %}} 
            FirstName = 'Default' 
        {{% end %}} 
    WHERE ID = 1 
```

#Usage

SQiggL commands go between `{{%` and `%}}`. _(This will be configurable in the future)_

##Actions

Current actions: `if, else, endif`

Actions are keywords that tell the parser what to do when it comes accross them. This is similar to almost every other language you've come across. 

Writing an `if` statement will conditionally include or ignore statements in your SQL based on the variables that have been passed to the parser. For example lets consider the following statement:
```
    UPDATE Something SET 
        {{% if myVar is not null %}} 
            FirstName = '{{ myVar }}'
        {{% else %}} 
            FirstName = 'Default' 
        {{% end %}} 
    WHERE ID = 1 
```
Let's then assume we passed in a value of `Bob` for `myVar`, the output would be the following:
```
    UPDATE Something SET 
        FirstName = 'Bob' 
    WHERE ID = 1 
```
Inversely, if we did not pass a value in for `myVar` then the result would be:
```
    UPDATE Something SET 
        FirstName = 'Default' 
    WHERE ID = 1 
```

##Variables
Currently all variables are global and are passed in as the second argument to the parser:
```
    SQiggL.parse('SELECT {{ myVar }} FROM {{ myTable }}', {myTable: 'Customers', myVar: 'Name'});
```
_In future versions there will be ways to declare scoped and global variables within the query._

##Conditions

Current conditions: `=, >, <, is null` _(Where is `!=`? See the modifier section below...)_

Conditions are the conditional part of an action. This is what the action uses to determine what how it should behave. This is similar to all other languages, but with one small caveat. Conditions may be "modified" by using a modifier. _(See modifier section below)_

```
    UPDATE Something SET 
        {{% if myVar > 100 %}} 
            Rank =  {{ myVar }}
        {{% else %}} 
            Rank = 0 
        {{% end %}} 
    WHERE ID = 1
```
_SQiggL supports `> and <` for numbers only currently. There are plans to support unique operators to assist in other situations, for example: `len>` or `abc>` being "length greater than" and "alphabetically greater than" respectively. Have suggestions for operators, or would like to ask questions, please submit [an issue](https://github.com/SnareChops/SQiggL-js/issues) and I'd love to discuss any ideas or complaints._

##Modifiers

Current modifiers: `!, not, =`


_`=` is both a condition and a modifier depending on which position it is in, For example the `=` in `>=` is a modifier, and in `!=` it is a condition. This is because `>` is the condition in the first example and `=` is a modifier that then checks if the result is equal when `>` is false. (In other words, it does what you think it should, but there is a small difference in the way the parser looks at it. You probably will never have to understand why they're different, but if you do, you'll stumble on some gems in this language that make it special)_