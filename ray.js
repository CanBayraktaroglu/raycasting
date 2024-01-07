class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
    }

    show(){
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    lookAt(x, y){
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    cast(wall)
    {
        //Line Line Intersection calculation
        const x1 = wall.pt1.x;
        const y1 = wall.pt1.y;
        const x2 = wall.pt2.x;
        const y2 = wall.pt2.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = x3 + this.dir.x;
        const y4 = y3 + this.dir.y;
        

        const denominator = (x1-x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        
        //If denominator == 0, both lines are parallel
        if (denominator == 0){
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;

        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        if (t > 0 && t < 1 && u > 0){
            
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }
        else {
            return;
        }

    }

    setAngle(angle){
        this.dir = p5.Vector.fromAngle(angle);
    }
}