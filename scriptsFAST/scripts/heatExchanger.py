# q = FAUTL
# One Shell + 2 Tube Passes HX
# T -> [Thi, Tho, Tci, Tco]
def heatExchanger(F, area, U, T:list):
    lm_T = ((T[1]-T[2])-(T[0]-T[3]))
    q = F*area*U*lm_T
    return q

if __name__ == '__main__':
    # You can put code here to test or run the heatExchanger script independently
    pass