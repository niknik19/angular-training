# Angular Training

#### This repository contains code for angular training..

#### - [Task - 1]
 To display the inheritance of scopes in angularjs applications do the following:
 - with ng-init create a shared value in root scope
 - create parentCtrl1 and parentCtrl2 on the same level under root scope
 - in the scope level of parentCtrl1 and parentCtrl2 place inputs with ng-model bound to shared value
 - near each input place output of shared value with {{}} expression
 - create ChildCtrl1 and ChildCtrl2 under parentCtrl1 scope
 - in the scope level of ChildCtrl1 and ChildCtrl2 place inputs with ng-model bound to shared value
 - near each inputs place outputs of shared value with {{}} expression
 - improve the application so that all the {{}} show the same values after different scenarios of typing in valuse into different inputs.
#### - [Task 1.5]
 - Implement modal-window directive that will take title and actionCallback as params (title is string for window title, actionCallback to handle OK-button click). 
You should use ng-transclude directive so that you could insert any content into modal window. Content is context-dependent. Modal-window dorective use example:
```html
<modal-window title="modalWindowTitle" action-callback="modalWindowActionHandler(event, sender)">
	<p>
		Although, in a way, the Congressional powers in Article 9 made the "league of states as cohesive and strong as any similar sort of republican confederation in history",
		<sup id="cite_ref-11" class="reference">
			<a ng-click="doSomeMagic()">[11]</a>
		</sup>
		the chief problem with the new government under the Articles of Confederation was, in the words of 
		<a ng-click="doSomeMagic()">George Washington</a>, 
		"no money".
		<sup id="cite_ref-maier11-13_12-0" class="reference"><a ng-click="doSomeMagic()">[12]</a></sup>...	
	</p>
</modal-window>
```
 - There is doSomeMagic handler called in ng-click inside
 - Please create doSomeMagic method in rootScope (it doesn't metter what it will do - let it log into console some line - 'Hello World!')

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Task - 1]: <//niknik19.github.io/angular-training/>

