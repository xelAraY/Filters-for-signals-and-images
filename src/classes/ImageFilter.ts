export abstract class ImageFilter {
  constructor(protected kernel: number) {}

  abstract getFilteredPoints(points?: number[][][]): number[][][];
}
