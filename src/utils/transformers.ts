export class BooleanTransformer {
    to(value) {
        return value ? 1 : 0;
    }

    from(value) {
        return value ? true : false;
    }
}
