$.mask.masks = $.extend($.mask.masks, {
    'date': { mask: '19/39/9999' }
    , 'datetime': { mask: '19/39/9999 29:69' }    
    , 'integer16': { mask: '9999', type: 'reverse', defaultValue: '+' }
    , 'integer': { mask: '999.999.999', type: 'reverse', defaultValue: '+' }
    , 'integer64': { mask: '999.999.999.999.999.999', type: 'reverse', defaultValue: '+' }
    , 'decimal' : { mask : '9999.999,999,999,9', type : 'reverse', defaultValue: '000' }  
    , 'currency': { mask: '99.999,999,999,999', type: 'reverse', defaultValue: '+' }
    , 'percent': { mask: '9999,999', type: 'reverse', defaultValue: '+' }
    , 'zipCode': { mask: '9999,999', type: 'reverse', defaultValue: '+' }
    , 'phone': { mask: '(99) 9999-9999', defaultValue: '' }
});