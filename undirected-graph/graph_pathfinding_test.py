from graph_pathfinding import *
from graph_data import *

all_paths_A_to_H = find_all_paths(graph0, 'A', 'H')

for path in all_paths_A_to_H:
    print(path)

shortest_path_A_to_H = dijkstra(graph0, 'A', 'G')

print("Shortest path between A and H:", shortest_path_A_to_H)