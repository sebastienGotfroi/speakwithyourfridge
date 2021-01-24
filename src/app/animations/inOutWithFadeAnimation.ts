import {
    trigger,
    style,
    transition,
    animate,
    group
  } from "@angular/animations";
  
  export const inOutWithFadeAnimation =  [
      trigger(
        'inOutAnimation', 
        [
          transition(
            ':enter', 
            [
              style({ height: 0, opacity: 0 }),
              group([
                animate('0.5s ease-out', 
                style({ height: '*'})),
                animate('0.5s 0.2s ease-in', 
                      style({opacity: 1 }))
              ])
              
            ]
          ),
          transition(
            ':leave', 
            [
              style({ height: '*', opacity: 1 }),
              animate('0.3s ease-out', 
                      style({ height: 0, opacity: 0 }))
            ]
          )
        ]
      )
    ];
  