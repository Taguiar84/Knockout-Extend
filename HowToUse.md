# KnockoutExtend

## Basic usages

	// Sample 1		
	<input data-bind="integerMask: viewModelField" type="text" > //Mask only number length 9
	<input data-bind="integerMask: viewModelField, maskOptions: { mask: 'integer16' }" type="text" > //Mask only number length 4
	<input data-bind="integerMask: viewModelField, maskOptions: { mask: 'integer64' }" type="text" > //Mask only number length 18
	// Sample 2
	<input data-bind="zipCodeMask: viewModelField, maskOptions: { mask: 'integer64' }" type="text" > //ZipCode behaves depending on the culture
	<input data-bind="creditCardMask: viewModelField, maskOptions: { mask: 'integer64' }" type="text" > //ZipCode 
	// Sample 3
	<input data-bind="dateMask: viewModelField" type="text" > //Date behaves depending on the culture 	 
	<input data-bind="dateTimeMask: viewModelField" type="text" > //Date behaves depending on the culture 	 



## Extra Compoments

	### CkEditor
		KnocoutExtend dont install ckeditor, you will need config ckeditor http://ckeditor.com/

	//	
	<textarea id="UNIQUEID" data-bind="ckeditor: viewModelField" > </textarea> //for this ID is requerid