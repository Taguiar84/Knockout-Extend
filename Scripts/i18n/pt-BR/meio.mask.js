$.mask.masks = $.extend($.mask.masks, {
    'date': { mask: '39/19/9999' }
    , 'datetime': { mask: '39/19/9999 29:69' }
    , 'integer16': { mask: '9999', type: 'reverse', defaultValue: '+' }
    , 'integer': { mask: '999.999.999', type: 'reverse', defaultValue: '+' }
    , 'integer64': { mask: '999.999.999.999.999.999', type: 'reverse', defaultValue: '+' }
    , 'currency': { mask: '99,999.999.999.999', type: 'reverse', defaultValue: '+' }
    , 'percent': { mask: '9999,999', type: 'reverse', defaultValue: '+' }
    , 'zipCode': { mask: '99999-999', defaultValue: '' }
    , 'phone': { mask: '(99) 9999-9999', defaultValue: '' }
});