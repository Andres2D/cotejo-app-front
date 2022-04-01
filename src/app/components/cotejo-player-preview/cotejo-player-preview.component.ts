import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatchPlayer } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-cotejo-player-preview',
  templateUrl: './cotejo-player-preview.component.html',
  styleUrls: ['./cotejo-player-preview.component.scss']
})
export class CotejoPlayerPreviewComponent {

  @Input() img: string | undefined = 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray02&eyeType=Default&eyebrowType=Default&mouthType=Serious&skinColor=Brown';
  @Input() update: boolean = false;
  @Input() player!: MatchPlayer;
  @Input() playerFieldPosition: 'left' | 'right' = 'left';

  @Output() emitUpdate = new EventEmitter();

  updateImage(): void {
    this.emitUpdate.emit('');
  }
}
