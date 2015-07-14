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
_SQiggL supports `>` and `<` for numbers only currently. There are plans to support unique operators to assist in other situations, for example: `len>` or `abc>` being "length greater than" and "alphabetically greater than" respectively. Have suggestions for operators, or would like to ask questions, please submit [an issue](https://github.com/SnareChops/SQiggL-js/issues) and I'd love to discuss any ideas or complaints._

##Modifiers

Current modifiers: `!, not, =`

_`=` is both a condition and a modifier depending on which position it is in, For example the `=` in `>=` is a modifier, and in `!=` it is a condition. This is because `>` is the condition in the first example and `=` is a modifier that then checks if the result is equal when `>` is false. (In other words, it does what you think it should, but there is a small difference in the way the parser looks at it. You probably will never have to understand why they're different, but if you do, you'll stumble on some gems in this language that make it special)_

Modifiers are a core concept in SQiggL and may behave different than other languages. Each condition has a collection of modifiers that can be applied. Each condition also has different positions for modifiers.

To see this lets look at the `>` condition and examine how the modifiers are parsed and executed.

`>` supports the modifiers `Not` and `OrEqual`. `Not` has two identifers `!` and `not` (case insensitive). Basically you can think of them as synonyms. `OrEqual` only has one identifier `=`.

`>` looks for modifiers in the following positions _(position denoted with `(m)`)_

```
<variable> (m)>(m) <comparative>
```

The modifiers can be in either position, but they are executed from right to left. Lets look at an example:

```
something !>= 12
```

In this example lets say that `something` is 14. The `>` condition recognizes `=` and `!` as modifiers and adds them to the modifiers array in the order they were found (left to right). First the conditional checks if `something` is greater than `12` (which is true), then it passes it's result (true) and all other information to the modifiers (in reverse order). The `=` modifier only executes if the input is false, this prevents overriding the `>` condition result and changing it to false (that would be bad). Finally the `!` modifier is passed the result from `=`, which is true as it simply forwards the result from `>` in this case. The `!` modifier then simply negates whatever result (true) it receives (true => false, false => true). Therefore this condition, after modifier execution, fails and the action is notified of the result.

Now, for those of you still with me, lets look at an odd one:

```
something !=! 'hello'
``` 

The `=` condition checks for modifiers in the same positions, and also uses the same modifiers as the `>` condition.

First something (`hello` for this example) is checked if it is equal to `'hello'`, which is true. Next the `!` modifier is applied, which changes the result to `false`, then the second `!` modifier is applied, and `true` is returned as the result of the condition.

So basically `!=!` is the same as `=`, but is less efficient.

So why would I allow this to even work, the reason is simple really. I don't want to place restrictions on the developer, I want them to be able to create freely, and with the addition of the plugin API that will be available in version 1.0, there will be ample ability to create modifiers that are useful.

One last note is that some modifiers, like `!`, have more than one identifier. This means that they can be used interchangably. `!=` is the same as `not =`, `is not null` is equal to `is ! null`

The following is a list of all combinations of current conditions/modifiers

<variable> (m)=(m) <comparative> | should I use? | same as | rule
---------------------------------|---------------|---------|-----
`=` | yes | | true if variable is equal to the comparative
`!=` | yes | | false if variable is equal to the comparative
`=!` | maybe | `!=` | false if variable is equal to the comparative
`==` | no | `=` | true if variable is equal to the comparative (inefficient)
`===` | no | `=` | true if variable is equal to the comparative (inefficient)
`!==` | no | `!=` | false if variable is equal to the comparative (inefficient)
`==!` | no | `=` | true if variable is equal to the comparative (inefficient)
`!=!` | no | `=` | true if variable is qual to the comparative (inefficient)

<variable> (m)>(m) <comparative> | should I use? | same as | rule
---------------------------------|---------------|---------|-----
`>` | yes | | true if variable is greater than the comparative
`!>` | yes | | false if variable is greater than the comparative
`>=` | yes | | true if variable is greater than or equal to the comparative
`>!` | maybe | `!>` | false if variable is greater than the comparative
`=>` | maybe | `>=` | true if variable is greater than or equal to the comparative
`!>=` | maybe | `<` | false if variable is greater than the comparative
`!>!` | no | `>` | true if variable is greater than the comparative (inefficient)
`=>!` | no | `=` | true only if variable is equal to the comparative (inefficient)

<variable> (m)<(m) <comparative> | should I use? | same as | rule
---------------------------------|---------------|---------|-----
`<` | yes | | true if variable is less than the comparative
`!<` | yes | | false if variable is less than the comparative
`<=` | yes | | true if variable is less than or equal to the comparative
`<!` | maybe | `!<` | false if variable is less than the comparative
`=<` | maybe | `<=` | true if variable is less than or equal to the comparative
`!<=` | maybe | `>` | false if variable is less than the comparative
`!<!` | no | `<` | true if variable is less than the comparative (inefficient)
`=<!` | no | `=` | true only if variable is equal to the comparative (inefficient)

<variable> is (m) null | should I use? | rule
-----------------------|---------------|-----
`is null` | yes | true if variable is null
`is not null` | yes | false if variable is null
`is ! null` | maybe | false if variable is null