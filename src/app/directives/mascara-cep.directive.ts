import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[cepDirective]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MascaraCepDirective),
    multi: true
  }]
})

//4
export class MascaraCepDirective implements ControlValueAccessor{

  onChange: any

  //(1)
  constructor(private element: ElementRef){}
  
  //(2)
  @HostListener('input') onInput() {
    const input = this.element.nativeElement as HTMLInputElement
    input.value = this.parseValue(input.value)
    this.onChange(input.value)
  }
  
  //3
  parseValue(value){
    value = value.replace(/-/g,'')
    
    if (value.length > 8){
      value = value.substr(0,8)
    }

    let sections = []

    sections.push(value.substr(0,5))
    
    if(value.length > 5){
      sections.push(value.substr(5,3))
    }

    return sections.join('-')
    
  }
  
  writeValue(value: any): void {
    this.element.nativeElement.value = this.parseValue(value)
  }

  registerOnChange(fn: any): void {
    //Sempre que o valor interno do componente mudar esta função deve ser chamada passando o novo valor, isto está sendo feito no método setValue.
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    //Não precisa ser implementada.
  }

  setDisabledState?(isDisabled: boolean): void {
    //Não precisa ser implementada.
  }
  
}

/* Explicação:
Dentro da diretiva precisamos de duas coisas:
1) Uma referência ao elemento sendo feita através do construtor.

2) Um binding de um evento no input para gente poder saber quando o usuário está
digitando no campo. Nesse caso, usamos o evento "input" de Html 5. A cada mudança no valor, 
nosso método será chamado.

3) Feito isso, implementamos o método de parse (implementação de exemplo - não otimizada).

4) No geral é isso, mas para a integração completa com os formulários do Angular, template forms e 
reactive forms, nossa diretiva precisa implementar ControlValueAccessor.

Atenção ao método onChange. Ele precisa ser chamado para que o novo valor seja notificado aos bindings 
de form.
*/
