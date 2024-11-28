const sizes = [[50, 49, 72, 20],
               [53, 52, 72, 22],
               [55, 53, 73, 23],
               [60, 57, 77, 24]];

class CalculateIdealSizes {
    constructor(measures) {
        this.measures = measures;
        this.total = [];
        this.mostAppearences = [0, 0, 0, 0];
    }

    calculate() {
        for (let i = 0; i < this.measures.length; i++) {
            if (this.measures[i] < sizes[0][i]) {
                this.total.push(0);
            } else if (this.measures[i] > sizes[3][i]) {
                this.measures.push(3);
            }

            for (let j = 0; j < sizes.length; j++) {
                if (this.measures[i] >= sizes[j][i] - 2 && this.measures[i] <= sizes[j][i] + 2) {
                    this.total.push(j);
                }
            }
        }
        
        this.total.forEach(value => {
            this.mostAppearences[value] += 1;
        });

        return this.mostAppearences;
    }
}
